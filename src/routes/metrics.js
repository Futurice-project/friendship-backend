import {merge} from 'lodash';
import Joi from 'joi';
import { getAuthWithScope } from '../utils/auth';

const metrics = [
];

export default metrics;

export const routes = server => server.route(metrics);
