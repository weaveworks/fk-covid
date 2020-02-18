docker run --detach \
	--name haproxy \
	-v $PWD/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg \
	haproxy
