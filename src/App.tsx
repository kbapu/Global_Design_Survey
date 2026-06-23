/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Survey } from './components/Survey';
import { AdminDashboard } from './components/Admin';
import { AdminLogin } from './components/AdminLogin';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';

  if (isAdmin) {
    if (isAuthenticated) {
      return <AdminDashboard />;
    } else {
      return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
    }
  }

  return <Survey />;
}

