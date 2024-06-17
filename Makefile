
RECS:= pcs.rec consoles.rec

computers.json: magtech.rec
	python3 compdata.py $<

magtech.rec: ${RECS}
	cat magtech.rechdr ${RECS} > $@

clean:
	rm -f computers.json magtech.rec
