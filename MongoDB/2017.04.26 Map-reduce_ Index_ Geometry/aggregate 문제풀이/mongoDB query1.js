//SELECT * FROM EMPLOYEES
db.employees.find()

//SELECT * FROM EMPLOYEES WHERE SAL > 1000 AND DEPTNO < 30;
db.employees.find(
    { $and: [
                { sal: { $gt: 1000}},
                { deptno: { $lt: 30}}
            ]
    }

)
    
//SELECT * FROM EMPLOYEES WHERE SAL < 2000 OR SAL > 1000
db.employees.find(
        { $or: [
                    {sal : {$lt: 2000}},
                    {sal : {$gt: 1000}}
              ]
            
         }
)
         
         
//SELECT * FROM EMPLOYEES WHERE DEPTNO = 30 ORDER BY ENAME DESC;         
db.employees.find(
            {
                deptno : 30
            }
         
).sort({ename: -1})


//SELECT COUNT(*) FROM EMPLOYEES WHERE SAL > 2500;
db.employees.find(
    {
        sal : {$gt : 2500}
    }
).count()
    

//SELECT * FROM EMPLOYEES WHERE DEPTNO IN (10, 30)
db.employees.find(
        {
            deptno: { $in : [10, 30]}
        }
)
    
        
//SELECT * FROM EMPLOYEES WHERE ENAME LIKE '%A%'
db.employees.find(
            {
                ename: /A/
            }
)
        
        
//SELECT * FROM EMPLOYEES WHERE ENAME LIKE 'A%'
db.employees.find(
    {
       ename: /^A/
    }
)
        
   
//SELECT * FROM EMPLOYEES  WHERE ENAME LIKE '%S'
db.employees.find(
    {
        ename : /S$/
    }
)
    

db.employees.find(
        {},
        { ename: 1, empno : 1}
)
        
////////////////aggregate
db.employees.aggregate([
    { $match: {deptno: 30}}, //match: where, having
    { $project: {_id: 0, ename: 1, deptno: 1}} //select 
])

db.employees.aggregate([    
        //group by deptno        sum(sal) as total_sum
        {$group: {_id:"$deptno", total_sal: {$sum: "$sal"}}},
        {$project : {_id:1, total_sal:1}}
])
        

db.employees.aggregate([
       {$match: {deptno: 30}},
       {$group: {_id:"$job", total_sal: {$sum: "$sal"}}},
       {$project : {_id: 1, total_sal: 1}}
        
])
///////
db.zipcode.find({state:"NY", city:"NEW YORK"})

db.zipcode.aggregate([
    {
        //group by state          sum(pop) as total_pop
        $group: {_id:"$state", total_pop: {$sum: "$pop"}}
    },
    {
        $match: {total_pop : {$lte: 1000000}}
    },
    {
        $project: {_id:1, total_pop_thou: { $divide: ["$total_pop", 1000] }}
    }
    

])
    
    
    
db.zipcode.aggregate([

    { 

        $group:{_id:"$state", total_pop:{$sum:"$pop"}}

    },

    {

        $match :{total_pop:{$lte:1000000}}

    },

    {

        $project : {_id:1, total_pop_thou:{$mod:["$total_pop",3]}, total_pop:1}

    },

    {

        $match :{total_pop_thou:1}

    }

])
    
    
//1
db.zipcode.aggregate([
   {
       $group: {_id: "$state", max_pop:{$max: "$pop"}, min_pop:{$min: "$pop"}}
   }
])
   
    
//2
db.zipcode.aggregate(
        {
          $group: {_id: "$state", sum_pop: {$sum: "$pop"}}  
        },
        {
          $group: {_id: 0, max_pop: {$max: "$sum_pop"}, min_pop: {$min: "$sum_pop"}}
        },
        {
          $project: { _id:new ObjectId(), substract_pop : {$subtract:["$max_pop", "$min_pop"]}}
        }
)   
//3   
db.zipcode.aggregate([
    { $match: {city: "NEW YORK"}},
    { $project: {pop:"$pop", zipcode:"$_id"}},
    { $sort: {pop: -1}},
    { $limit:1}
    ])


    
//4
db.zipcode.aggregate([
    { $group: { _id: {state: "$state", city: "$city"}, pop: {$sum: "$pop"}}},
    { $group: { _id: "$_id.state", avgCityPop: { $avg: "$pop"}}},
    { $sort: {avgCityPop: -1}}
]);
    
 //cancel. my write. 
db.zipcode.aggregate([
     { $group: {_id: {state: "$state"}, pop: {$sum: "$pop"}}},
     { $group: {_id: "$_id.state", avg_pop: {$avg: "$pop"}}},
     { $sort: {avg_pop: -1}}
])
    
    
//about employees
db.employees.aggregate([
    { $match: { $and: [{deptno: 10}, {sal : {$gte : 500}}, {sal : {$lte: 3000}},
              { $or: [{job: "CLERK"}, {job: "SALESMAN"}]} ]}},
    { $project : {empno : 1, ename : 1, job : 1, sal : 1 }}
])


//2
db.employees.aggregate([
    { $match: {deptno: 30}},
    { $project: {empno: 1, ename: 1, sal: 1, comm: {$ifNull:["$comm", 0]}, total_sal: {$add:["$sal",
      {$ifNull:["$comm", 0]}]} }}
])
 
//zipcode
//1
db.zipcode.aggregate([
     { $match: {city: "NEW YORK"}},
     { $group: {_id: 0, count: {$sum: "$pop"}}},
     { $skip: 0}
])      
    
//2
db.zipcode.aggregate([
     { $match: {state: "MA"}},
     { $project: {city: 1}}
])
     
//3
db.zipcode.aggregate([
     { $project: { city: 1, pop: 1}  },
     { $sort: {pop: -1}},
     { $limit: 10}
     
])
     
//4
db.zipcode.aggregate([
     { $match: {state: "MA"}},
     { $group: {_id: "$city", total_pop: {$sum: "$pop"}} },
     { $match: {total_pop: {$lte: 1000}}},
     { $project: {city: 1}}
])
     
//5
db.zipcode.aggregate([
     { $group: {_id: "$state", total: {$sum: 1}}}
     
])
     
     
//6
db.zipcode.aggregate([
     { $group: {_id: "$state", total: {$sum: "$pop"}}},
     { $match: {total: {$gte: 100000}}},
     { $project: {state: 1}}
])
         
//7
db.zipcode.aggregate([
        { $match: { state: "WA"} },
        { $group: {_id: 0, count: {$sum: 1}}}
])