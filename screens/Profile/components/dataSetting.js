const SECTIONS = [
  {
    header: [{ id: "widget", label: "Widget Setup", iconName: "add" }],
    items: [
      {
        id: "addWidget",
        icon: "add-circle",
        label: "Add the Widget",
        type: "link",
      },
      {
        id: "widget",
        icon: "help-circle",
        label: "Widget Tutorial",
        type: "link",
      },
      // { id: "darkMode", icon: "moon", label: "Dark Mode", type: "toggle" },
    ],
  },
  {
    header: [{ id: "general", label: "General", iconName: "person" }],
    items: [
      {
        id: "changePassword",
        icon: "lock-closed",
        label: "Change Password",
        type: "link",
      },
      { id: "help", icon: "help-circle", label: "Get help", type: "link" },
      { id: "feedback", icon: "send", label: "Share Feedback", type: "link" },
    ],
  },
  {
    header: [{ id: "about", label: "About", iconName: "heart" }],
    items: [
      {
        id: "facebook",
        icon: "logo-facebook",
        label: "Facebook",
        type: "link",
      },
      {
        id: "instagram",
        icon: "logo-instagram",
        label: "Instagram",
        type: "link",
      },
      { id: "twitter", icon: "logo-twitter", label: "Twitter", type: "link" },
      { id: "share", icon: "share", label: "Share LoveM", type: "link" },
      { id: "rate", icon: "star", label: "Rate LoveM", type: "link" },
      { id: "terms", icon: "pencil", label: "Terms of Service", type: "link" },
      {
        id: "privacy",
        icon: "lock-closed",
        label: "Privacy Policy",
        type: "link",
      },
    ],
  },
  {
    header: [{ id: "danger", label: "Danger Zone", iconName: "alert-circle" }],
    items: [
      { id: "logout", icon: "hand-right", label: "Log Out", type: "link" },
      { id: "delete", icon: "trash", label: "Delete account", type: "link" },
    ],
  },
];
export default SECTIONS;
