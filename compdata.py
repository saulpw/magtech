#!/usr/bin/env python3

import sys
import json
import re

def clean(row):
    return {k:cleanval(v) for k, v in row.items()}

factors = {
    'TB': 2**40,
    'GB': 2**30,
    'MB': 2**20,
    'KB': 2**10,
    'BYTES': 1,
    'B': 10**9,
    'M': 10**6,
    'K': 10**3,
}

def cleanval(origv):
    if not isinstance(origv, str):
        return origv

    v = origv
    try:
        for factor, amt in factors.items():
            if v.upper().endswith(factor):
                v = re.sub(factor, '', v, flags=re.I)
                v = v.strip()
                return float(v)*amt
    except Exception as e:
        pass

    return origv

def decode_multiline(line, fp):
    'Parse *line* and lookahead into *fp* as iterator for continuing lines.  Return (multiline, next_line) where *multiline* can contain newlines and *next_line is the line after the combined *multiline*.  Handle "\\" at end and "+" at beginning of lines.  *next_line* will be None iff iterator is exhausted.'
    while True:
        try:
            next_line = next(fp)
        except StopIteration:
            return line, None

        if line.endswith('\\'):
            line = line[:-1] + next_line
        elif next_line.startswith('+'):
            # strip leading r'+ ?'
            next_line = next_line[2:] if next_line.startswith('+ ') else next_line[1:]
            line += '\n' + next_line
        else:
            return line, next_line

def get_kv(line):
    return re.split(r':[ \t]?', line, maxsplit=1)

def read_rec(fn):
        rows = None
        row = None
        newRecord = True
        next_line = ''
        comments = []
        tablename = ''

        fp = iter(open(fn))
        while next_line is not None:
          try:
            line, next_line = decode_multiline(next_line, fp)
            line = line.strip()

            if not line:  # end of record separator
                newRecord = True
                continue

            elif line[0] == '#':
                comments.append(line)
                continue

            if not rows or (newRecord and line[0] == '%'):
                if tablename and rows:
                    yield tablename, rows

                rows = []
                comments = []
                newRecord = False

            if line[0] == '%':
                desc, rest = get_kv(line[1:])
                if desc == 'rec':
                    tablename = rest
#                elif desc in 'mandatory allowed':
#                    for colname in rest.split():
#                        colname = self.maybeClean(colname)
#                        if colname not in sheet.colnames:
#                            sheet.addColumn(ItemColumn(colname))
#                elif desc in ['key', 'unique']:
#                    for i, colname in enumerate(rest.split()):
#                        colname = self.maybeClean(colname)
#                        if colname not in sheet.colnames:
#                            sheet.addColumn(ItemColumn(colname, keycol=i+1))
#                elif desc in ['sort']:
#                    sheet._ordering = [(colname, False) for colname in rest.split()]
#                elif desc in ['type', 'typedef']:
#                    pass
#                elif desc in ['auto']:  # autoincrement columns should be present already
#                    pass
#                elif desc in ['size', 'constraint']:  # ignore constraints
#                    pass
#                elif desc in ['confidential']:  # encrypted
#                    pass
#                else:
#                    vd.warning('Unhandled descriptor: ' +line)
            else:
                if newRecord:
                    row = None
                    newRecord = False

                if not row:
                    row = {}
                    rows.append(row)

                name, rest = get_kv(line)
#                name = self.maybeClean(name)
#                if name not in sheet.colnames:
#                    sheet.addColumn(ColumnItem(name))

                if name in row:
                    if not isinstance(row[name], list):
                        row[name] = [row[name]]
                    row[name].append(rest)
                else:
                    row[name] = rest
          except Exception as e:
              raise

        yield tablename, rows

def main(recfn):
    # read in .rec db and output .json tables
    for name, rows in read_rec(recfn):
        with open(f'{name}.json', mode='w') as fp:
            fp.write(json.dumps([clean(r) for r in rows]))


main(*sys.argv[1:])
