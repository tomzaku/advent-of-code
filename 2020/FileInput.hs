module FileInput where

readIntFile :: FilePath -> IO [Int]
readIntFile = fmap (map read) . readLinesFile

readLinesFile :: FilePath -> IO [String]
readLinesFile = fmap lines . readFile