import { getAll, getOne, getFilterCourseFrontend, getFilterCategory, createCourse, update } from "./helper/course.helper";
import request from "supertest";
import App from "../src/server";
import { ICourse } from "../src/interface/ICourse";
import { Courses } from "../src/models/Courses";
const app = new App().app

describe('POST /course- Course POST Endpoint', () => {
    it('Should be able to create course', async () => {
       const createdCourse = await createCourse({
         title: 'Test Tittile',
         image: 'Test image',
         topic: 'Test topic',
         level: 'Test level',
         price: 12,
         hours: 12,
         students: 12,
         instructor: 'Test instrcutor',
         category: 'Test category',
         devCategory: 'Test devcategory'
       } as ICourse);
       
      expect(createdCourse.status).toEqual(201);
      expect(createdCourse.body).toEqual({
            success: true,
            message: 'Success create one course',
            data: createdCourse.body.data,
            statusCode: 201
      });

    });
});

describe('GET /course/- Course Endpoint', () => {
   let foundCourse: request.Response;
   beforeEach(async () => {
      const createdCourse = await createCourse({
         title: 'Test Tittile',
         image: 'Test image',
         topic: 'Test topic',
         level: 'Test level',
         price: 12,
         hours: 12,
         students: 12,
         instructor: 'Test instrcutor',
         category: 'Test category',
         devCategory: 'Test devcategory'
      } as ICourse);

      expect(createdCourse.status).toEqual(201);
      expect(createdCourse.body).toEqual({
         success: true,
         message: 'Success create one course',
         data: createdCourse.body.data,
         statusCode: 201
      });

      foundCourse = createdCourse
   });
    
    afterEach(async () => {
        await Courses.deleteMany();
    });
   
   it('Should be able to see spesific course', async () => {
        const foundAllCourse = await getOne(foundCourse.body.data._id);
        expect(foundAllCourse.status).toEqual(200);
        expect(foundAllCourse.body).toEqual({
            success: true,
            message: 'Found spesific markets',
            data: foundAllCourse.body.data,
            statusCode: 200
        });
    });


    it('Should be able to see all course', async () => {
        const foundAllCourse = await getAll();
        expect(foundAllCourse.status).toEqual(200);
        expect(foundAllCourse.body).toEqual({
            success: true,
            message: 'Found all markets',
            data: foundAllCourse.body.data,
            statusCode: 200
        });
    });
   
   
   it('Should be able to see all course with dev-category to equals frontend', async () => {
        const keyword = 'frontend';
        const foundAllCourse = await getFilterCourseFrontend(keyword);
        expect(foundAllCourse.status).toEqual(200);
        expect(foundAllCourse.body).toEqual({
            success: true,
            message: `Found course with dev-category ${keyword}`,
            data: foundAllCourse.body.data,
            statusCode: 200
        });
   });

   it('Should be able to see all course with dev-category to equals backend', async () => {
        const keyword = 'backend';
        const foundAllCourse = await getFilterCourseFrontend(keyword);
        expect(foundAllCourse.status).toEqual(200);
        expect(foundAllCourse.body).toEqual({
            success: true,
            message: `Found course with dev-category ${keyword}`,
            data: foundAllCourse.body.data,
            statusCode: 200
        });
   });

   it('Should be able to see all course with dev-category to equals desktop', async () => {
        const keyword = 'desktop';
        const foundAllCourse = await getFilterCourseFrontend(keyword);
        expect(foundAllCourse.status).toEqual(200);
        expect(foundAllCourse.body).toEqual({
            success: true,
            message: `Found course with dev-category ${keyword}`,
            data: foundAllCourse.body.data,
            statusCode: 200
        });
   });

   it('Should be able to see all course with category to equals css', async () => {
        const keyword = 'css';
        const foundAllCourse = await getFilterCategory(keyword);
        expect(foundAllCourse.status).toEqual(200);
        expect(foundAllCourse.body).toEqual({
            success: true,
            message: `Found course with category ${keyword}`,
            data: foundAllCourse.body.data,
            statusCode: 200
        });
   });

   it('Should be able to see all course with category to equals css', async () => {
        const keyword = 'php';
        const foundAllCourse = await getFilterCategory(keyword);
        expect(foundAllCourse.status).toEqual(200);
        expect(foundAllCourse.body).toEqual({
            success: true,
            message: `Found course with category ${keyword}`,
            data: foundAllCourse.body.data,
            statusCode: 200
        });
   });
   
});

describe('PUT /course/courseID- Course Endpoint', () => {
   let foundCourse: request.Response;
   beforeEach(async () => {
      const createdCourse = await createCourse({
         title: 'Test Tittile',
         image: 'Test image',
         topic: 'Test topic',
         level: 'Test level',
         price: 12,
         hours: 12,
         students: 12,
         instructor: 'Test instrcutor',
         category: 'Test category',
         devCategory: 'Test devcategory'
      } as ICourse);

      expect(createdCourse.status).toEqual(201);
      expect(createdCourse.body).toEqual({
         success: true,
         message: 'Success create one course',
         data: createdCourse.body.data,
         statusCode: 201
      });

      foundCourse = createdCourse
   });
    
    afterEach(async () => {
        await Courses.deleteMany();
    });
   
   // it('Should be able to see spesific course', async () => {
   //      const foundAllCourse = await getOne(foundCourse.body.data._id);
   //      expect(foundAllCourse.status).toEqual(200);
   //      expect(foundAllCourse.body).toEqual({
   //          success: true,
   //          message: 'Found spesific markets',
   //          data: foundAllCourse.body.data,
   //          statusCode: 200
   //      });
   //  });
});