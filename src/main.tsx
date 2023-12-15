import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Homepage from './components/Homepage/Homepage'
import DiaryEntries from './components/DiaryEntries/DiaryEntries'
import About from './components/About/About'
import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/diary-entries" element={<DiaryEntries />} />
          <Route path="/diary-entries/:id" element={<DiaryEntries />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
