answ = 0
prob = 0.1666666
for i in range(100):
    answ += prob*pow(1-prob, i*2)
print(answ)