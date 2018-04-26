import React, { Component } from "react";
import { Image } from "react-native";
import axios from "axios";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  H1,
  H2
} from "native-base";
import styles from "../assets/styling";
import NavBar from "../Components/NavBar";
import { Col, Row, Grid } from "react-native-easy-grid";
import { bestBuyKey } from "../assets/constants";

class ResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: [],
      pageCount: 1,
      totalPages: 0
    };
    //use this word inside function
    this.fetchItem = this.fetchItem.bind(this);
  }

  componentDidMount() {
    //get params as props from home screen search
    const { params } = this.props.navigation.state;

    const query = params ? params.searchQuery : null;
    if (query == null) {
      console.log("query is empty");
    } else {
      this.fetchItem(query);
    }
  }

  fetchItem(query) {
    const pageCount = this.state.pageCount;
    const path = `https://api.bestbuy.com/v1/products((search=${query}))?apiKey=${bestBuyKey}&sort=customerReviewAverage.asc&show=name,regularPrice,salePrice,customerReviewAverage,freeShipping,shipping,thumbnailImage,image&pageSize=50&page=${pageCount}&format=json`;

    console.log("====================================");
    console.log(path);
    console.log("====================================");

    axios
      .get(path)
      .then(response => {
        this.setState({
          searchData: response.data.products,
          totalPages: response.data.totalPages
        });
        // console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const cardContent = this.state.searchData;
    //get params as props from home screen search
    const { params } = this.props.navigation.state;

    const itemCards = cardContent.map((item, i) => {
      return (
        <Card key={i} style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: item.thumbnailImage }} />
              <Body>
                <Text>{item.name}</Text>
                <Text note>{item.salePrice}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri: item.image }}
              style={{ height: 150, width: 150, flex: 1 }}
            />
            <Text>{item.salePrice}</Text>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        </Card>
      );
    });

    return (
      <Container style={styles.container}>
        <NavBar
          title={params.searchQuery}
          drawerOpen={() => this.props.navigation.navigate("DrawerToggle")}
        />
        <Content>
          {/* <Grid>
            <Row>
              <Col>

                
              </Col>
            </Row>
            <Row />
          </Grid> */}
          {itemCards}
        </Content>
      </Container>
    );
  }
}

export default ResultScreen;
