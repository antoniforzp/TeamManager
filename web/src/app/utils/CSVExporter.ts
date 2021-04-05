export interface ScoutCsvPayload {
  name: string;
  surname: string;
  birthDate?: Date;
  pesel?: string;
  address?: string;
  phone?: string;
  rank?: string;
  instructorRank?: string;
  troop?: string;
  roles?: string;
}

export class CSVExporter {
  public exportAndDownlaod(
    filename: string,
    rows: object[],
    headers?: string[]
  ): void {
    if (!rows || !rows.length) {
      return;
    }

    const separator = ',';
    const keys: string[] = Object.keys(rows[0]);
    let columHearders: string[];

    if (headers) {
      columHearders = headers;
    } else {
      columHearders = keys;
    }

    const csvContent =
      'sep=,\n' +
      columHearders.join(separator) +
      '\n' +
      rows
        .map((row) => {
          return keys
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];

              cell =
                cell instanceof Date
                  ? cell.toLocaleString()
                  : cell.toString().replace(/"/g, '""');

              if (navigator.msSaveBlob) {
                cell = cell.replace(/[^\x00-\x7F]/g, ''); // Remove non-ascii characters
              }
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            })
            .join(separator);
        })
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      // In case of IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
