import RouteNode from './Class/RouteNode';

const Router = new RouteNode();

Router.Get('/login', [
    (req, res, next) => {
        res.status(200).json('hello');
    }
]);

export default Router.router;
