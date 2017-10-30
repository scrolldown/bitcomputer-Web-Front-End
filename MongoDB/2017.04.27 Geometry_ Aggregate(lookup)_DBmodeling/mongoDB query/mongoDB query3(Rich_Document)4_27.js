//Embedded Document
db.ord.insert(
{
  ord_id        :       "2017-04-28-012345",
  customer_name :        "Bit Academy",
  emp_name      :       "Minho So",
  total         :       "55000",
  payment_type  :       "Cash",
  item_id :     [
                { item_id : "1",
                product_name : "Monami",
                item_price : 500,
                qty : 100,
                price : 50000},
             
                { item_id : "2",
                product_name : "A4",
                item_price : 50,
                qty : 100,
                price : 5000},    
                ] 
}
)


db.ord.find()

//Extent Document
db.ord.insert(
{
        ord_id: "2017-04-28-0123456",
        customer_name : "Bit Academy",
        emp_name : "Minho So",
        total : "55000",
        payment_type : "Cash",
}
)

db.ord.update(
    {ord_id: "2017-04-28-0123456"},
    {$set : { item_id :         [{item_id: "1",
                                  product_name : "Monami",
                                  item_price : 500,
                                  qty : 100,
                                  price : 50000},
                                  
                                  {item_id: "2",
                                  product_name : "A4",
                                  item_price : 50,
                                  qty : 100,
                                  price : 5000}
                                 ]
              }
 });



db.ord.find()



//
db.board.insert(
{       
      bidx : 31,
      title : "rrrr",
      contents : "ccc",
      userid : 1,
      writedate : "17/04/21",
      moddate : "17/04/21",
      hitdcnt : 1,
      system_name : [{ system_name : "FILE1.TXT",
                       original_name : "FILE.TXT",
                       path : "C:\User\abc\bit....",
                       file_size: 5021,
                       file_type: ".TXT",
                       down_date: "17/04/21",
                       downcnt: 0 
                     },
                     { system_name : "FILE2.TXT",
                       original_name : "FILE.TXT",
                       path : "C:\User\abc\bit....",
                       file_size: 5021,
                       file_type: ".TXT",
                       down_date: "17/04/21",
                       downcnt: 2
                     },
                     { system_name : "FILE3.TXT",
                       original_name : "FILE.TXT",
                       path : "C:\User\abc\bit....",
                       file_size: 5021,
                       file_type: ".TXT",
                       down_date: "17/04/22",
                       downcnt: 3
                     }
    
    
                    ]
}       
)


db.board.insert(
{
    bidx : 27,
    title : "11",
    contents : "11",
    userid : 1,
    write_date: "17/04/21",
    mod_date: "17/04/21",
    hitcnt : 0,
    board_kind: "A"
}
)

db.board.update(
    {bidx: 27},
    {$set : { system_name : [{ system_name : "update1",
                               original_name : "update",
                               path : "C:\User\abc\bit....",
                               file_size: 500,
                               file_type: ".image/jpeg",
                               down_date: "17/04/24",
                               downcnt: 3},
                               { system_name : "update2",
                               original_name : "update",
                               path : "C:\User\abc\bit....",
                               file_size: 500,
                               file_type: ".image/jpeg",
                               down_date: "17/04/24",
                               downcnt: 4},
                               { system_name : "update3",
                               original_name : "update",
                               path : "C:\User\abc\bit....",
                               file_size: 500,
                               file_type: ".image/jpeg",
                               down_date: "17/04/25",
                               downcnt: 0}
                        ]
                          
             }

         });


db.board.find()

