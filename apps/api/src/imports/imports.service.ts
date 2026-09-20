import { BadRequestException, Injectable } from '@nestjs/common';
export const canonicalCsvFields = ['symbol', 'side', 'quantity', 'entryPrice', 'exitPrice', 'openedAt', 'closedAt', 'fees', 'accountId'];
@Injectable() export class ImportsService {
  preview(csv: string) {
    const [headerLine, ...rows] = csv.trim().split(/\r?\n/); if (!headerLine) throw new BadRequestException('A header row is required');
    const headers = headerLine.split(',').map((x) => x.trim());
    const normalized = headers.map((header) => ({ header, suggestedField: canonicalCsvFields.find((field) => header.toLowerCase().replace(/[_\s-]/g, '') === field.toLowerCase()) ?? null }));
    return { headers: normalized, sampleRows: rows.slice(0, 5).map((row) => row.split(',').map((cell) => cell.trim())), rowCount: rows.length, warnings: rows.length === 0 ? ['The file has no trade rows.'] : [] };
  }
}

