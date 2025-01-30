export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Travel Planner",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    // {
    //   label: "Home",
    //   href: "/",
    // },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
