/* eslint-env jest */
import React from 'react';
import {
  fireEvent, render, screen, within,
} from '@testing-library/react';
import App from './App';
import experiences from '../public/profile/experiences.json';
import research from '../public/profile/research.json';
import projects from '../public/profile/projects.json';
import education from '../public/profile/education.json';

const profiles = {
  experiences, research, projects, education,
};

beforeEach(() => {
  localStorage.clear();
  global.fetch = jest.fn((url) => {
    const name = url.split('/').pop().replace('.json', '');
    return Promise.resolve({ ok: true, json: () => Promise.resolve(profiles[name]) });
  });
});

afterEach(() => jest.restoreAllMocks());

test('shows ML work and loads real publications and experience', async () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Making intelligence/);
  expect(screen.getByRole('heading', { name: 'xLAMFlow' })).toBeInTheDocument();
  expect([...document.querySelectorAll('.work-card h3')].map((heading) => heading.textContent))
    .toEqual(['Salesforce Koa', 'Everse', 'xLAMFlow']);
  expect(await screen.findByRole('heading', { name: research.research[0].title }))
    .toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Salesforce' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'View résumé' })).toHaveAttribute('href',
    expect.stringContaining('drive.google.com'));
});

test('filters project archive without losing the selected work', async () => {
  render(<App />);
  await screen.findByRole('heading', { name: 'Salesforce' });
  fireEvent.click(screen.getByRole('button', { name: 'Software' }));
  expect(screen.getByRole('heading', { name: 'ANNAM Food Ordering App' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'xLAMFlow' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Machine learning' }));
  expect(screen.getByRole('heading', { name: 'OCR for sanskrit language' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Selected' }));
  expect(document.querySelectorAll('.work-card')).toHaveLength(3);
});

test('expands publications and role details', async () => {
  render(<App />);
  const allPublications = await screen.findByRole('button', { name: 'All 6 publications +' });
  expect(document.querySelectorAll('.publication')).toHaveLength(4);
  fireEvent.click(allPublications);
  expect(document.querySelectorAll('.publication')).toHaveLength(6);
  const role = screen.getByRole('heading', { name: 'Salesforce' }).closest('article');
  const more = within(role).getByRole('button', { name: 'More about this role +' });
  expect(more).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(more);
  expect(more).toHaveAttribute('aria-expanded', 'true');
  expect(within(role).getByText(experiences.experiences[0].workDescription[1])).toBeVisible();
});

test('supports theme persistence and keyboard dismissal of mobile navigation', async () => {
  render(<App />);
  await screen.findByRole('heading', { name: 'Salesforce' });
  fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  expect(localStorage.getItem('portfolio-theme')).toBe('dark');
  fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
  expect(screen.getByRole('button', { name: 'Close navigation' }))
    .toHaveAttribute('aria-expanded', 'true');
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.getByRole('button', { name: 'Open navigation' }))
    .toHaveAttribute('aria-expanded', 'false');
});

test('offers useful links when profile requests fail', async () => {
  global.fetch.mockRejectedValue(new Error('offline'));
  render(<App />);
  expect(await screen.findByRole('alert')).toHaveTextContent('Some profile details couldn’t load');
  expect(screen.getByRole('heading', { name: 'xLAMFlow' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Email Tulika' })).toHaveAttribute('href', 'mailto:tawalgao@uci.edu');
});
