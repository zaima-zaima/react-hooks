import { RouteObject, useNavigate } from "react-router-dom";
import unique from "../../utils/unique";

interface NammingRoute {
    name: string
}

interface NammingRouteOptions {
    query?: object,
    params?: object
}

function fillter(routes: RouteObject[]): (RouteObject & NammingRoute)[] {
    const array = [] as (RouteObject & NammingRoute | RouteObject)[];
    function filterEach(routes: (RouteObject & NammingRoute | RouteObject)[]) {
        routes.forEach(r => {
            array.push(r);
            if (r.children && r.children.length !== 0) {
                filterEach(r.children);
            }
        });
    }
    filterEach(routes);
    return unique(array, "name") as (RouteObject & NammingRoute)[];
}

function queryPathFactory(query: object = {}) {
    const array = [];
    for (const queryName in query) {
        array.push(`${queryName}=${query[queryName]}`);
    }
    return array.join("&")
}

function pathResolve(path: string, query: string, params: object) {
    let str = path;
    const reg = /:[\w]+(\/|\?|)/g
    const regArray = path.match(reg) || [];
    regArray.forEach(p => {
        const sign = p.split((/\b/));
        console.log(sign[1]);
        const tmp = `:${sign[1]}`;
        str = str.replace(new RegExp(tmp), params[sign[1]]);
    })
    str += `?${query}`
    return str;
}

export function useHistory(routes: RouteObject[]) {
    const history = useNavigate();
    return {
        push: (name: string, options?: NammingRouteOptions) => {
            let path = "";
            const array = fillter(routes);
            array.forEach(routes => {
                if (name === routes.name) {
                    path = routes.path;
                    return;
                }
            });
            const str = pathResolve(path, queryPathFactory(options && options.query || {}), options && options.params || {});
            history(str);
        }
    }
}