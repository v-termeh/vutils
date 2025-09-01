import type { Router, NavigationFailure } from "vue-router";

/**
 * Enhances a Vue Router instance with history-saving and restoration capabilities.
 *
 * Adds two methods to the router:
 * - `pushHistory(name: string)`: Navigates to a named route, restoring its previous query and params if available.
 * - `replaceHistory(name: string)`: Replaces the current route with a named route, restoring its previous query and params if available.
 *
 * Also tracks route transitions and saves the previous route's query and params in its meta.
 *
 * @param {Router} router - The Vue Router instance to enhance.
 */
export function createRouteHistory(router: Router) {
    router.beforeEach((_, from, next) => {
        if (from.name) {
            from.meta.savedRoute = {
                query: { ...from.query },
                params: { ...from.params },
            };
        }

        next();
    });

    router.pushHistory = function (name: string): Promise<NavigationFailure | void> {
        const route = router.resolve({ name });

        if (!route || !route.name) {
            console.warn(`[routeHistoryPlugin] Route "${name}" not found!`);
            return Promise.resolve();
        }

        const saved = route.meta.savedRoute;
        if (saved) {
            return router.push({
                name,
                query: saved.query,
                params: saved.params,
            });
        }

        return router.push({ name });
    };

    router.replaceHistory = function (name: string): Promise<NavigationFailure | void> {
        const route = router.resolve({ name });

        if (!route || !route.name) {
            console.warn(`[routeHistoryPlugin] Route "${name}" not found!`);
            return Promise.resolve();
        }

        const saved = route.meta.savedRoute;
        if (saved) {
            return router.replace({
                name,
                query: saved.query,
                params: saved.params,
            });
        }

        return router.replace({ name });
    };
}
