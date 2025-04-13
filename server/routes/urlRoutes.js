import express from 'express'
import { createShortUrl, getUserUrls, handleRedirect, fetchShortUrl} from '../controller/urlFunt.js';

const router = express.Router();

router.post('/short-url',createShortUrl);
router.post('/short-url/fetch',handleRedirect);
router.post('/short-url/my-urls',getUserUrls);
router.post('/short-url/fetch', fetchShortUrl);

export default router;