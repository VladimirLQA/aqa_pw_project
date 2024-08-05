import { CreatedProducts } from 'utils/storages/createdProducts';
import { LoggedInUsers } from 'utils/storages/loggedInUsers';

const Products = new CreatedProducts();
const Users = new LoggedInUsers();

export { Products, Users };
