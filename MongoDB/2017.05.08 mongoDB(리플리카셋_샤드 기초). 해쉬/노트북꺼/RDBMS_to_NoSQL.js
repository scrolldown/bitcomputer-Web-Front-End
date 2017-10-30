db.board.find();
db.board.remove({bidx: 1})

db.board.insert(
{
    bidx : "1",
    title : "test1",
    contents : "test1",
    userid : "test1",
    hitcnt : "0",
    writedate : "17/04/29",
    moddate : "17/04/29",
    board_kind : "A",
    filepathname : [{ filepathname : "Chrysanthemum6.jpg",
                      originalname : "Chrysanthemum.jpg",
                      filesize : 879394,
                      filetype : "image/jpeg"
                    },
                    { filepathname : "Chrysanthemum7.jpg",
                      originalname : "Chrysanthemum.jpg",
                      filesize : 879394,
                      filetype : "image/jpeg"
                    }
                    ]
    
}
)