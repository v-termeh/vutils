import "vue-router";
import { type NavigationFailure } from "vue-router";

declare module "vue-router" {
    interface RouteMeta {
        savedRoute?: {
            query: Record<string, any>;
            params: Record<string, any>;
        };
    }

    interface Router {
        /**
         * Navigates to a named route, restoring its previous query and params if available.
         *
         * @param {string} name - The name of the route to navigate to.
         * @returns {Promise<NavigationFailure | void>} A promise that resolves when navigation is complete or fails.
         */
        pushHistory: (name: string) => Promise<NavigationFailure | void>;
        /**
         * Replaces the current route with a named route, restoring its previous query and params if available.
         *
         * @param {string} name - The name of the route to replace with.
         * @returns {Promise<NavigationFailure | void>} A promise that resolves when navigation is complete or fails.
         */
        replaceHistory: (name: string) => Promise<NavigationFailure | void>;
    }
}
