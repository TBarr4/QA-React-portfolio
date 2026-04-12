const http = require('http');

const PORT = process.env.MOCK_API_PORT || 4000;

const products = [
  {
    id: 1,
    title: 'Mock Backpack',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/mock-1.jpg',
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: 'Mock Slim Fit T-Shirt',
    price: 22.3,
    description: 'Slim-fitting style with contrast raglan long sleeve.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/mock-2.jpg',
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: 'Mock Laptop',
    price: 999.99,
    description: 'Powerful laptop for development and testing workloads.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/mock-3.jpg',
    rating: { rate: 4.7, count: 88 },
  },
];

const carts = [
  {
    id: 1,
    userId: 1,
    date: new Date().toISOString(),
    products: [
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 },
    ],
  },
];

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  });
  res.end(JSON.stringify(body));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    });
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  const path = url.pathname;

  if (req.method === 'GET' && path === '/health') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === 'POST' && path === '/auth/login') {
    const body = await parseBody(req).catch(() => ({}));
    if (body.username === 'mor_2314' && body.password === '83r5^_') {
      sendJson(res, 200, { token: 'mock-jwt-token' });
      return;
    }
    sendJson(res, 401, { message: 'Invalid credentials' });
    return;
  }

  if (req.method === 'GET' && path === '/products') {
    sendJson(res, 200, products);
    return;
  }

  if (req.method === 'GET' && path === '/products/categories') {
    const categories = [...new Set(products.map((p) => p.category))];
    sendJson(res, 200, categories);
    return;
  }

  if (req.method === 'GET' && path.startsWith('/products/category/')) {
    const category = decodeURIComponent(path.replace('/products/category/', ''));
    sendJson(
      res,
      200,
      products.filter((p) => p.category === category)
    );
    return;
  }

  if (req.method === 'GET' && /^\/products\/\d+$/.test(path)) {
    const id = Number(path.split('/').pop());
    const product = products.find((p) => p.id === id);
    if (!product) {
      sendJson(res, 404, { message: 'Product not found' });
      return;
    }
    sendJson(res, 200, product);
    return;
  }

  if (req.method === 'GET' && path === '/carts') {
    sendJson(res, 200, carts);
    return;
  }

  if (req.method === 'POST' && path === '/carts') {
    const body = await parseBody(req).catch(() => ({}));
    const created = {
      id: carts.length + 1,
      userId: body.userId || 1,
      date: body.date || new Date().toISOString(),
      products: Array.isArray(body.products) ? body.products : [],
    };
    carts.push(created);
    sendJson(res, 201, created);
    return;
  }

  if (req.method === 'GET' && /^\/carts\/\d+$/.test(path)) {
    const id = Number(path.split('/').pop());
    const cart = carts.find((c) => c.id === id);
    if (!cart) {
      sendJson(res, 404, { message: 'Cart not found' });
      return;
    }
    sendJson(res, 200, cart);
    return;
  }

  sendJson(res, 404, { message: 'Not found' });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock API running at http://127.0.0.1:${PORT}`);
});
