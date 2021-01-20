import RouteNode from './Class/RouteNode'
import { Handler } from '../Utils/tools'

const Router = new RouteNode()

Router.Get('/login', [
  async (req, res, next) => {
    const sa = {
      de: 'fe',
      ded: {
        desa: 'ede',
      },
    }
    Handler(res).statusOk(sa, [])
  },
])

export default Router.router
