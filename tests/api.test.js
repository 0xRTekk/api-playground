const request = require('supertest');
const app = require('../app/server');

// Chapitre de tests sur notre API de tâches
describe('Tasks API', () => {
  // Chapitre de tests sur le endpoint /tasks
  describe('/tasks endpoint', () => {
    // Test sur GET /tasks
    it('should return the tasks list', async () => {
      const res = await request(app).get('/tasks');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    // Test sur POST /tasks
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/tasks')
        .send({
          label: 'test is cool',
          done: false,
          userId: 1
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('label', 'test is cool');
    });
  });

  describe('/tasks/:id endpoint', () => {
    // Test sur GET /tasks/:id
    it('should find a task by id', async () => {
      const id = 1;
      const res = await request(app).get(`/tasks/${id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('label');
    });

    it('should return 404 if task not found', async () => {
      const id = 666;
      const res = await request(app).get(`/tasks/${id}`);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toMatchObject({});
    });
    // Test sur PUT /tasks/:id
    // Test sur PATCH /tasks/:id
    // Test sur DELETE /tasks/:id
  });
});