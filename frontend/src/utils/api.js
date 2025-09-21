export async function fetchAllocations() {
  const res = await fetch('/api/allocations')
  if (!res.ok) throw new Error('API error: ' + res.status)
  return res.json()
}
