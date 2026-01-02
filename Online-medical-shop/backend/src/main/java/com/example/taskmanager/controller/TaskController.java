package com.example.taskmanager.controller;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/tasks") @CrossOrigin(origins="http://localhost:3000")
public class TaskController {
  private final TaskRepository repo; public TaskController(TaskRepository repo){this.repo=repo;}
  @GetMapping public List<Task> all(){return repo.findAll();}
  @PostMapping public Task create(@RequestBody Task task){return repo.save(task);}
  @PutMapping("/{id}") public Task update(@PathVariable Long id,@RequestBody Task t){t.setId(id);return repo.save(t);}
  @DeleteMapping("/{id}") public void delete(@PathVariable Long id){repo.deleteById(id);}
}