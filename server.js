
const Joi=require('joi')


const express=require('express')
const app =express()

app.use(express.json())

const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},
]

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.get('/api/courses',(req,res)=>{
    res.send(courses)
})

app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if (!course){
        res.status(404).send('The course id is not valid Course ID')
        return
    }else{
        res.send(course)
        return
    }
    res.send(req.params.id)
})

//create a course
app.post('/api/courses',(req,res)=>{
    const result=validateReq(req.body)
console.log(result)

if(result.error){
    res.status(400).send(result.error)
    return
}

 if (!req.body.name || req.body.name.length<3){
    res.status(400).send('Name is required and should be minimum 3 character')
    return    
    }

const course={
    id:courses.length+1,
    name:req.body.name,
}

courses.push(course)
res.send(course)

})

//update a course

app.put('/api/courses/:id',(req,res)=>{
     const course=courses.find(c=>c.id===parseInt(req.params.id))
    if (!course){
        res.status(404).send('The course id is not valid Course ID')
        return
    }

   if(!req.body.name || req.body.name<3){
        res.status(400).send('Name required and should be 3 characters')
        return;
    }
course.name=req.body.name
res.send(course)
})

//delete course
app.delete('/api/courses/:id',(req,res)=>{
     const course=courses.find(c=>c.id===parseInt(req.params.id))
    if (!course){
        res.status(404).send('The course id is not valid Course ID')
        return
    }

    // find the index of course and delete using splice method
    const index=courses.indexOf(course)
    courses.splice(index,1)

    res.send(course)

})


// function validateReq(course){
// //     const schema={
// //     name:Joi.string().min(3).required()
// // }
// // // returns an object
// // return Joi.valid(course,schema)

// if(!course.name && course.name<3){
//     res.status(400).send('Name required and should be 3 characters')
    
// }
// }

const port =process.env.PORT || 3000
app.listen(port,()=>console.log('Server starts at http//localhost:3000/'))