import { CreatedProducts } from 'utils/storages/createdProducts';
import { LoggedInUsers } from 'utils/storages/loggedInUsers';
// TODO abstract storage
const Products = new CreatedProducts();
const Users = new LoggedInUsers();

export { Products, Users };
