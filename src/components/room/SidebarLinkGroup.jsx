import React, { useState } from 'react';

const SidebarLinkGroup = ({ children }) => {
  return <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 bg-slate-900`}>{children()}</li>;
};

export default SidebarLinkGroup;
