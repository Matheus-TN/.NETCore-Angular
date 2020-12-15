using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Smartschool_WebAPI.Data;
using Smartschool_WebAPI.Models;

namespace Smartschool_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunoController : ControllerBase
    {
        private readonly IRepository repo;

        public AlunoController(IRepository repo)
        {
            this.repo = repo;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await this.repo.GetAllAlunosAsync(true);
                return Ok(result);
            }
            catch (System.Exception)
            {
                return BadRequest("Banco de dados falhou: AlunoController");
            }
        }

        [HttpGet("{AlunoId}")]
        public async Task<IActionResult> GetByAlunoId(int AlunoId)
        {
            try
            {
                var result = await this.repo.GetAlunoAsyncById(AlunoId, true);
                return Ok(result);
            }
            catch (System.Exception)
            {
                return BadRequest("Banco de dados falhou: AlunoController");
            }
        }

        [HttpGet("ByDisciplina/{disciplinaId}")]
        public async Task<IActionResult> GetByDisciplinaId(int disciplinaId) 
        {
             try
             {
                 var result = await this.repo.GetAlunosAsyncByDisciplinaId(disciplinaId, false);
                 return Ok(result);
             }
             catch (System.Exception)
            {
                return BadRequest("Banco de dados falhou: AlunoController");
            }
        }

        [HttpPost]
        public async Task<IActionResult> post(Aluno model) 
        {
             try
             {
                 this.repo.Add(model);
                if( await this.repo.SaveChangesAsync())
                {
                    return Ok(model);
                }
             }
             catch (System.Exception)
            {
                return BadRequest("Banco de dados falhou: AlunoController");
            }
            return BadRequest("Erro Não Esperado !!");  
        }

        [HttpPut("{alunoId}")]
        public async Task<IActionResult> put(int alunoId, Aluno model) 
        {
             try
             {
                var aluno = await this.repo.GetAlunoAsyncById(alunoId, false);
                if(aluno == null) return NotFound();
                
                this.repo.Update(model);

                if( await this.repo.SaveChangesAsync())
                {
                    return Ok(model);
                }
             }
             catch (System.Exception)
            {
                return BadRequest("Banco de dados falhou: AlunoController");
            }
            return BadRequest("Erro Não Esperado !!");  
        }

        [HttpDelete("{alunoId}")]
        public async Task<IActionResult> delete(int alunoId) 
        {
             try
             {
                var aluno = await this.repo.GetAlunoAsyncById(alunoId, false);
                if(aluno == null) return NotFound();
                
                this.repo.Delete(aluno);

                if( await this.repo.SaveChangesAsync())
                {
                    return Ok(new { message = "Deletado" });
                }
             }
             catch (System.Exception)
            {
                return BadRequest("Banco de dados falhou: AlunoController");
            }
            return BadRequest("Erro Não Esperado !!");  
        }
    }
}

/*
get all http://localhost:5000/api/aluno
get id http://localhost:5000/api/aluno/3
get por disciplina http://localhost:5000/api/aluno/ByDisciplina/3
post http://localhost:5000/api/aluno
put http://localhost:5000/api/aluno/3
delete http://localhost:5000/api/aluno/3
*/