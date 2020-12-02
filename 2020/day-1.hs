readMultipleLinesAsStringArray :: Int -> IO [String]
readMultipleLinesAsStringArray 0 = return []
readMultipleLinesAsStringArray n = do
    line <- getLine
    rest <- readMultipleLinesAsStringArray(n - 1)
    return (line : rest)


main = do
  input <- readMultipleLinesAsStringArray 200
  let years = map (\x -> read x :: Int) input
  let product2 = [x*y | x<- years, y<- years, x+y == 2020]
  let product3 = [x*y*z | x<- years, y<- years, z<-years, x+y+z == 2020]
  let result2 = head $ take 1 product2
  let result3 = head $ take 1 product3
  print result2
  print result3
