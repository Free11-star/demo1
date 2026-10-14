import { ref } from 'vue';

const STORAGE_KEY = 'registrations_v1';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load registrations', e);
    return [];
  }
}

const registrations = ref(load());

function save(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    registrations.value = items;
  } catch (e) {
    console.error('Failed to save registrations', e);
    throw e;
  }
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getAll() {
  return [...registrations.value].sort((a, b) => b.time - a.time);
}

export function add(reg) {
  const items = [...registrations.value];
  const record = {
    id: makeId(),
    name: reg.name || '',
    studentId: reg.studentId || '',
    activity: reg.activity || '',
    needsTeam: !!reg.needsTeam,
    time: Date.now(),
  };
  items.push(record);
  save(items);
  return record;
}

export function remove(id) {
  const items = registrations.value.filter(r => r.id !== id);
  save(items);
}

export function total() {
  return registrations.value.length;
}

export function list(page = 1, pageSize = 5) {
  const all = getAll();
  const start = (page - 1) * pageSize;
  return all.slice(start, start + pageSize);
}

export function latest(n = 5) {
  return getAll().slice(0, n);
}
