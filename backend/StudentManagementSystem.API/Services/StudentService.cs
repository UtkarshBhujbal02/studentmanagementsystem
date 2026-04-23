using StudentManagementSystem.API.DTOs;
using StudentManagementSystem.API.Models;
using StudentManagementSystem.API.Repositories;
using Microsoft.Extensions.Logging;

namespace StudentManagementSystem.API.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _repository;
        private readonly ILogger<StudentService> _logger;

        public StudentService(IStudentRepository repository, ILogger<StudentService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<IEnumerable<StudentResponseDto>> GetAllAsync()
        {
            _logger.LogInformation("Getting all students.");
            var students = await _repository.GetAllAsync();
            return students.Select(s => new StudentResponseDto
            {
                Id = s.Id,
                Name = s.Name,
                Email = s.Email,
                Age = s.Age,
                Course = s.Course,
                CreatedDate = s.CreatedDate
            });
        }

        public async Task<StudentResponseDto?> GetByIdAsync(int id)
        {
            _logger.LogInformation($"Getting student by id: {id}");
            var s = await _repository.GetByIdAsync(id);
            if (s == null) return null;
            return new StudentResponseDto
            {
                Id = s.Id,
                Name = s.Name,
                Email = s.Email,
                Age = s.Age,
                Course = s.Course,
                CreatedDate = s.CreatedDate
            };
        }

        public async Task<StudentResponseDto> CreateAsync(StudentCreateDto dto)
        {
            _logger.LogInformation("Creating a new student.");
            var student = new Student
            {
                Name = dto.Name,
                Email = dto.Email,
                Age = dto.Age,
                Course = dto.Course,
                CreatedDate = DateTime.UtcNow
            };
            var created = await _repository.CreateAsync(student);
            return new StudentResponseDto
            {
                Id = created.Id,
                Name = created.Name,
                Email = created.Email,
                Age = created.Age,
                Course = created.Course,
                CreatedDate = created.CreatedDate
            };
        }

        public async Task<bool> UpdateAsync(int id, StudentUpdateDto dto)
        {
            _logger.LogInformation($"Updating student with id: {id}");
            var student = await _repository.GetByIdAsync(id);
            if (student == null) return false;

            student.Name = dto.Name;
            student.Email = dto.Email;
            student.Age = dto.Age;
            student.Course = dto.Course;

            await _repository.UpdateAsync(student);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            _logger.LogInformation($"Deleting student with id: {id}");
            var student = await _repository.GetByIdAsync(id);
            if (student == null) return false;

            await _repository.DeleteAsync(id);
            return true;
        }
    }
}
