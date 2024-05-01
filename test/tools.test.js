const request = require('supertest');
const app = require("../app");
const db = require("../db");
let assignedID;


describe("Test the root path", () => {
  const data = [
    {
      nombreherramienta: "Imagen",
      propositoia: "Design",
      subpropositoia: "Design - Wireframing and Prototyping",
      ecosistema: "Cloud Services",
      tipocontenido: "Image",
      descripcion: `Imagen on Vertex AI is a generative AI service that utilizes the LaMDA language model to produce high-quality images from text prompts. It supports a wide range of image types, from realistic to creative, adaptable to various subjects, sizes, and styles, serving as a useful tool for visual content creation.`,
      licencia: "yes",
      imagen: "logo16",
      linkherramienta: "https://imagen.research.google/"
    },
    {
      nombreherramienta: "Translation AI",
      propositoia: "General Purpose",
      subpropositoia: null,
      ecosistema: "Cloud Services",
      tipocontenido: "Text",
      descripcion: `Google Cloud Translate offers text translation between languages, noted for its accuracy, scalability, and ease of use, suitable for multilingual content translation.`,
      costo: "Subscription-based",
      licencia: "yes",
      imagen: "logo2",
      linkherramienta: "https://cloud.google.com/translate"
    }
  ];

  const putData = {

  }

  beforeAll(async () => {
    for(const i in data){
      await db.query('INSERT INTO herramienta_ia (nombreherramienta, propositoia, subpropositoia, ecosistema, tipocontenido, descripcion, costo, licencia, imagen, linkherramienta) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10)', 
        [data[i].nombreherramienta, 
        data[i].propositoia, 
        data[i].subpropositoia, 
        data[i].ecosistema, 
        data[i].tipocontenido, 
        data[i].descripcion, 
        data[i].costo, 
        data[i].licencia, 
        data[i].imagen, 
        data[i].link]);
    }
  })

  afterAll(async () => {
    await db.query('DELETE FROM herramienta_ia');
    db.end();
  })

  test("Debe responder al metodo get", async () => {
    const response = await request(app).get('/tools')
    return expect(response.statusCode).toBe(200);
  })

  test("Debe responder con al menos una ID", async () => {
    const response = await request(app).get('/tools');
  
    expect(response.statusCode).toBe(200);


    expect(Array.isArray(response.body)).toBe(true);
  
    response.body.forEach(tool => {
      expect(tool).toHaveProperty('idherramienta');
      //Agarramos una de las id de las herramientas
      assignedID = tool.idherramienta;
      
    });
  });

  test("Debe responder al metodo get por ID", async () => {
    const response = await request(app).get(`/tools/${assignedID}`);
    return expect(response.statusCode).toBe(200);
  });


  test("Debe responder al metodo put", async () => {
    const toolAttributes = {
      nombreHerramienta: "Amazon SageMaker",
      propositoia: "General Purpose",
      subpropositoia: "",
      ecosistema: "Applications",
      tipocontenido: "Code",
      descripcion: `Amazon SageMaker is a fully managed machine learning service that supports model building, training, and deployment. It features Jupyter notebooks, IDEs, scalable training environments, and deployment options. Used in industries like retail and healthcare, SageMaker is user-friendly, scalable, cost-effective, and secure, with flexible pricing and AWS integration.`,
      licencia: "yes",
      imagen: "logo3",
      linkherramienta: "https://aws.amazon.com/sagemaker/"
    };

    const response = await request(app).put(`/tools/${assignedID}`).send(toolAttributes); 
    return expect(response.statusCode).toBe(200);
  });

  test("Debe responder al metodo post", async () =>{
    const newToolAtrributes = {
      nombreHerramienta: "Amazon Rekognition",
      propositoia: "General Purpose",
      subpropositoia: "",
      ecosistema: "Applications",
      tipocontenido: "Image",
      descripcion: `Amazon Rekognition is a cloud-based machine learning service that identifies objects, faces, and text in images and videos. It's used across multiple industries for content moderation, security, and analytics, offering ease of use, scalability, and security. The service integrates with other AWS services and is available globally.`,
      licencia: "yes",
      imagen: "logo4",
      linkherramienta: "https://aws.amazon.com/rekognition/",
    }

    const response = await request(app).post('/tools').send(newToolAtrributes);
    return expect(response.statusCode).toBe(201);

  });

  test("Debe responder al metodo delete", async() => {
    const response = await request(app).delete(`/tools/${assignedID}`);
    return expect(response.statusCode).toBe(204);
  });

  test("Debe responder al get basado en categoria y valor", async() =>{
    const response = await request(app).get('/tools/purpose/General%20Purpose');

    return expect(response.statusCode).toBe(200);
  });

  test("Debe haber traido items de General Purpose", async () => {
      const response = await request(app).get('/tools/purpose/General%20Purpose');
    
      response.body.forEach(tool => {
      expect(tool.propositoia).toEqual('General Purpose');
      
    });
  }); 
})
