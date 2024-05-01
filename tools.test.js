const request = require('supertest');
const express = require('express');
const toolsRouter = require('./tools'); 

// Mock de los metodos del tool
jest.mock('./models/tool', () => ({
  getToolById: jest.fn()
}));

// Create an instance of Express app and use the toolsRouter
const app = express();
app.use('/tools', toolsRouter);

describe('GET /tools/:id', () => {
  it('Return status code 200 for available items', async () => {
    // Mock data returned from toolsModel
    const mockTool = {
      id: 1,
      name: 'Tool 1',
      description: 'Description of Tool 1'
    };
    const id = 1;

    // Creamos un mock de nuestro valor obtenido por el get
    const toolsModel = require('./models/tool');
    toolsModel.getToolById.mockResolvedValue(mockTool);

    // Send a GET request to the endpoint
    const response = await request(app).get(`/tools/${id}`);

    // Assert that the response status is 200
    expect(response.status).toBe(200);

    // Assert that the response body matches the mockTool
    expect(response.body).toEqual(mockTool);
  });

  it('should return 404 if the tool with the given ID is not found', async () => {
    // Mock the getToolById method to return -1, indicating tool not found
    const toolsModel = require('./models/tool');
    toolsModel.getToolById.mockResolvedValue(-1);

    // Send a GET request to the endpoint with a non-existent ID
    const response = await request(app).get('/tools/999');

    // Assert that the response status is 404
    expect(response.status).toBe(404);

    // Assert that the response body contains the expected error message
    expect(response.text).toContain('Tool with id 999 not found');
  });
});