import { Router } from 'express'; import { upsertRating } from '../controllers/ratingController.js'; const r=Router(); r.put('/:storeId',upsertRating); export default r;
