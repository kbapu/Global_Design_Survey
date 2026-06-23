/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Survey } from './components/Survey';
import { AdminDashboard } from './components/Admin';

export default function App() {
  // Simple routing for the prototype based on query params
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <Survey />;
}

