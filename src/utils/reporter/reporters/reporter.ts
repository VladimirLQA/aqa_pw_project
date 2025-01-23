import allure from 'utils/reporter/reporters/allure';
import html from 'utils/reporter/reporters/html';
import { BaseReporter } from 'utils/reporter/reporters/baseReporter';

const reporterServices: Record<string, BaseReporter> = { allure, html };

export default reporterServices[process.env.REPORTER || 'allure'];
