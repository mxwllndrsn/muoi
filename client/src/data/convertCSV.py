import xlrd
import csv

wb = xlrd.open_workbook('data.xlsx')
sh = wb.sheet_by_index(0)

newfile = open('data.csv', 'w')
with newfile:
    writer = csv.writer(newfile)
    writer.writerows(data)