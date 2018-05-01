import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Header,
  Content,
  H1,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Text,
  Button,
  Icon,
  Alert
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "../assets/styling";
import NavBar from "../Components/NavBar";
import { mLabKey } from "../assets/constants";

class ShoppingCartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    //use this word inside function
    this.getWatchlist = this.getWatchlist.bind(this);
  }
  componentDidMount() {
    this.getWatchlist();

    // this.deleteItem(0);
  }
  getWatchlist() {
    axios
      .get(
        `https://api.mlab.com/api/1/databases/e-sell-mobile/collections/e-sell-mobile?apiKey=${mLabKey}`
      )
      .then(response => {
        this.setState({ items: response.data });
      });
  }

  deleteItem(id) {
    axios.delete(
      `https://api.mlab.com/api/1/databases/e-sell-mobile/collections/e-sell-mobile?apiKey=${mLabKey}`,
      { id }
    );

    this.getWatchlist();
  }

  updateItem(id) {
    axios.update(
      `https://api.mlab.com/api/1/databases/e-sell-mobile/collections/e-sell-mobile?apiKey=${mLabKey}`,
      { id }
    );
  }

  render() {
    const allItems = this.state.items;

    const itemsCart = allItems.map((item, i) => {
      return (
        <Card key={i} style={{ flex: 0 }}>
          <CardItem
            bordered
            // button
            // onPress={() =>
            //   this.props.navigation.navigate("ShowCaseScreen", {
            //     serialNumber: item.sku,
            //      item: item
            //   })
            // }
          >
            <Left>
              <Thumbnail square source={{ uri: item.picture }} />
            </Left>
            <Body>
              <Text>{item.title}</Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text style={{ color: "red" }}> $ {item.price} </Text>
            <Button
              transparent
              textStyle={{ color: "#87838B" }}
              // onPress={() =>
              //   this.props.navigation.navigate("ShoppingCart", {
              //     serialNumber: item.sku,
              //     item: item
              //   })
              // }
              onPress={() => {
                Alert(item.id);
                // this.deleteItem(item._id.$oid);
              }}
            >
              <Icon name="cart-arrow-down" type="FontAwesome" />
              <Text>Delete</Text>
            </Button>
          </CardItem>
        </Card>
      );
    });

    return (
      <Container style={styles.container}>
        <NavBar
          drawerOpen={() => this.props.navigation.navigate("DrawerToggle")}
          title="Shopping Cart"
        />
        <Content>
          <Grid>
            <Grid>
              <Row>
                <Col>{itemsCart}</Col>
              </Row>
            </Grid>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default ShoppingCartScreen;
