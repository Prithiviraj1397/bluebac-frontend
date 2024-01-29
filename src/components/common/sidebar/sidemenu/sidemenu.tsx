import { PAGE_URL } from "../../../../resources/page_url";

export const MENUITEMS = [
  {
    menutitle: 'MAIN',
    Items: [
      {
        path: PAGE_URL.dashboard,
        icon: (<i className="side-menu__icon bx bxs-dashboard"></i>),
        title: "Dashboard",
        type: "link",
        badge: '',
        badgetxt: 'Hot',
        class: 'badge bg-danger-transparent ms-2',
        selected: false,
        active: false,
        children:[]
      },
      {
        path: PAGE_URL.user_management,
        icon: (<i className="side-menu__icon bx bxs-user"></i>),
        title: "User management",
        type: "link",
        badge: '',
        badgetxt: 'Hot',
        class: 'badge bg-danger-transparent ms-2',
        selected: false,
        active: false,
        children:[]
      },
    ]
  },
];
