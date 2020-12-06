import FileInput (readLinesFile)

solve :: Int -> Int -> Int -> [String] -> Int
solve _ _ _ [] = 0
solve k l n (x:xs) = fromEnum (cycle x !! (k * n) == '#') + solve k l (n + 1) (drop (l - 1) xs)

part1 :: [String] -> Int
part1 = solve 3 1 0

part2 :: [String] -> Int
part2 xs = product $ map (\(k, l) -> solve k l 0 xs) [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]

main = do
  input <- readLinesFile "./day-3.in"
  putStrLn $ "Solution 3a:\t" <> show (part1 input)
  putStrLn $ "Solution 3b:\t" <> show (part2 input)