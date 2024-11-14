import {
  HStack,
  Box,
  Image,
  Heading,
  Text,
  IconButton,
  useColorModeValue,
  useToast,
  VStack,
  Input,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import { useProductStore } from "../Store/product";

export default function ProductCard({ product }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct } = useProductStore();
  const toast = useToast();

  const { updateProduct } = useProductStore();
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const res = await updateProduct(pid, updatedProduct);
    
    if(!res.success){
      toast({
        title: "Failed to update product",
        description: res.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    else{
      toast({
        title: "Product updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
  };

  
  const handleDeleteProduct = async (_id) => {
    const { success, message } = await deleteProduct(_id);
    if (!success) {
      toast({
        title: "Failed to delete product",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Product deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const textcolor = useColorModeValue("gray.700", "gray.100");
  const bg = useColorModeValue("white", "gray.700");

  const [updatedProduct, UpdateProduct] = React.useState(product);
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="transform 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={200}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontSize="lg" fontWeight="bold" color={textcolor}>
          ${product.price}
        </Text>
        <Text fontSize="sm" color={textcolor}>
          {product.description}
        </Text>

        <HStack spacing={4} mt={4}>
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder="Product Name" 
                value={updatedProduct.name}
                onChange={(e) =>
                  UpdateProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input placeholder="Product Price"
                value={updatedProduct.price}
                onChange={(e) =>
                  UpdateProduct({ ...updatedProduct, price: e.target.value })
                }
              />
              <Input placeholder="Product description"
                value={updatedProduct.description}
                onChange={(e) =>
                  UpdateProduct({ ...updatedProduct, description: e.target.value })
                }
              />
              <Input placeholder="Image URL" 
              value={updatedProduct.image}
              onChange={(e) =>
                UpdateProduct({ ...updatedProduct, image: e.target.value })
              }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost"onClick={() =>(handleUpdateProduct(product._id, updatedProduct))}>Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
