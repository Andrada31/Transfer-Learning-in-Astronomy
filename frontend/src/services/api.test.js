import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  uploadImage,
  predictImage,
  checkSimilarity,
  predictYolo,
  fetchDocumentation,
} from './api.js';

const mock = new MockAdapter(axios);
const API_BASE = 'http://127.0.0.1:5000/api';

describe('API Functions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('uploads an image successfully', async () => {
    const mockFile = new Blob(['dummy'], { type: 'image/png' });
    mockFile.name = 'image.png';


    const mockResponse = { image: 'data:image/png;base64,somebase64data' };
    mock.onPost(`${API_BASE}/upload`).reply(200, mockResponse);

    const response = await uploadImage(mockFile);
    expect(response.data).toEqual(mockResponse);
  });


  it('checks image similarity', async () => {
    const payload = {
      image: 'data:image/png;base64,...',
      model: 'resnet',
    };
    const mockResponse = { similarImages: ['img1.png', 'img2.png'] };
    mock.onPost(`${API_BASE}/similarity`, payload).reply(200, mockResponse);

    const response = await checkSimilarity(payload.image, payload.model);
    expect(response.data).toEqual(mockResponse);
  });

  it('predicts with YOLO', async () => {
    const mockImage = 'data:image/png;base64,...';
    const mockResponse = { detections: [] };
    mock.onPost(`${API_BASE}/predict-yolo`, { image: mockImage }).reply(200, mockResponse);

    const response = await predictYolo(mockImage);
    expect(response.data).toEqual(mockResponse);
  });

  it('fetches documentation', async () => {
    const mockResponse = { endpoints: ['upload', 'predict'] };
    mock.onGet(`${API_BASE}/documentation`).reply(200, mockResponse);

    const response = await fetchDocumentation();
    expect(response.data).toEqual(mockResponse);
  });
});
