import {Avatar, Card, Paragraph, TouchableRipple} from "react-native-paper";
import React from "react";
import {Text, View} from "react-native";
import NewsItemList from "./NewsItemList";
import Moment from "react-moment";
import moment from "moment";
import CardFooter from "./CardFooter";


export class CardList extends React.PureComponent {
    render() {
        return <Card style={{marginBottom: 10}}>
            <Card.Title
                title={this.props.news.item.ownerName}
                titleStyle={{fontSize: 14, fontFamily: "NotoSans_400Regular"}}
                subtitle={
                    <Moment element={Text} fromNow>
                        {moment(this.props.news.item.createdAt).toDate()}
                    </Moment>
                }
                left={ (props) => <Avatar.Icon {...props} icon="folder"/>}

                right={(props) => (
                    <View>
                        <NewsItemList item={this.props.news.item}/>
                    </View>
                )}
            />
            <TouchableRipple
                onPress={() =>
                    this.props.props.navigation.navigate("NewsInDetail", {
                            item: this.props.news.item,
                            user: this.props.user,
                        })
                }
            >
                <View>
                    <Card.Content>
                        <Paragraph style={{fontFamily: "NotoSans_400Regular"}}>
                            {this.props.news.item.headline}
                        </Paragraph>
                    </Card.Content>
                    {
                        this.props.news.item.uri?.replace(/[[ ]/g, "").replace("]", "").split(",").map((uri, i) => {
                            return <Card.Cover
                                key={i}
                                source={{
                                    uri: "https://s3swabhimanibucket100153-swabhimani.s3.amazonaws.com/".concat(
                                        uri
                                    ),
                                }}
                                style={{width: "100%"}}
                            />
                        })
                    }
                </View>
            </TouchableRipple>
            <CardFooter item={this.props.news.item} likeDetails = {{
                  newsId: this.props.news.item.id
            }}/>
        </Card>;
    }
}
