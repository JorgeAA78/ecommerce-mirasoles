export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function buildProductUrl(product: { id?: string; objectID?: string; name: string }): string {
  const id = product.id || product.objectID;
  const slug = generateSlug(product.name);
  return `/item/${slug}-${id}`;
}

export function extractIdFromSlug(slugWithId: string): string {
  const parts = slugWithId.split('-');
  return parts[parts.length - 1];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price);
}
