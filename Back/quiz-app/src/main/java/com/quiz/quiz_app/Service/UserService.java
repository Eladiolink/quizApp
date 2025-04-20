package com.quiz.quiz_app.Service;

import com.quiz.quiz_app.DTO.User.UserMapper;
import com.quiz.quiz_app.DTO.User.UserRequestCreateDTO;
import com.quiz.quiz_app.DTO.User.UserResponseDTO;
import com.quiz.quiz_app.Entity.User;
import com.quiz.quiz_app.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;

    public List<UserResponseDTO> listar() {
        var res = userRepository.findAll();
        var b = userMapper.toDtoList(res);

        return  b;
    }

    public UserResponseDTO salvar(UserRequestCreateDTO userDto) {

        User user = userMapper.UserRequestCreateDTOToUser(userDto);
        User response = userRepository.save(user);

        return userMapper.toUserResponseDTO(response);
    }
}
