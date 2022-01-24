import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store.js";

Vue.use(Router);

export default new Router({
  mode: "history",
  linkExactActiveClass: "router-link-exact-active",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      props: true,
    },
    {
      path: "/destination/:slug",
      name: "DestinationDetails",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "DestinationDetails" */ "../views/DestinationDetails.vue"
        ),
      children: [
        {
          path: ":experienceSlug",
          name: "experienceDetails",
          props: true,
          component: () =>
            import(
              /* webpackChunkName: "ExperienceDetails" */ "../views/ExperienceDetails.vue"
            ),
        },
      ],
      beforeEnter: (to, from, next) => {
        const exists = store.destinations.find(
          (destination) => destination.slug === to.params.slug
        );
        if (exists) {
          next();
        } else {
          next({ name: "notFound" });
        }
      },
    },
    {
      path: "/404",
      alias: "*",
      name: "notFound",
      component: () =>
        import(/* webpackChunkName: "notFound" */ "../views/NotFound.vue"),
    },
  ],
});
