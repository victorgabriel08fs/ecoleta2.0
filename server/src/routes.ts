import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();

const pointsController = new PointsController();
const itemsController = new ItemsController();


routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points/:id',pointsController.show);
routes.get('/filtered-points',pointsController.filtered);
routes.get('/filteredCity-points',pointsController.filteredCity);
export default routes;