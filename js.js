const text = "what's your perfect first date?"

text.split("").map(parseInt).filter(a => a).reduce((a,b) => a + b).toString().split("").reverse().join()